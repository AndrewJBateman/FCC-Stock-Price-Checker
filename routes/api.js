'use strict';
const expect = require('chai').expect;
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const axios = require('axios');
//use bluebird promises for mongoose
const Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
const db=require('../models/stockDB.js');
const Project=db.Project

//function to extract stock price from iextrading website using axios
let accessStockPrice = async (stock) => {
  try {
    let stockValue= await axios.get(`https://api.iextrading.com/1.0/stock/${stock}/price`);
    return stockValue.data; //Object.data = stock price
  } 
  catch (err){
    return 'error ' +err;
  }
}
//function to create a db entry for a stock. If stock not already in db then add it. 
//If stock already in db then update price and ip address of user to likes array.  
let oneStock = async (stock, ipAddr, likesParam) => {
  try {
    let price = await accessStockPrice(stock);
    if (!price) {return 'Stock price not available.'}
    let stockAlreadyInDB = await Project.findOne({ stock });
    if (!stockAlreadyInDB) {
      let likes = (likesParam && likesParam==='true')? [ipAddr] : [];
      let project = new Project({ stock, price, likes });
      let newStockInfo = await project.save();
      console.log("newStockInfo: " +newStockInfo);
      return {
        stock: newStockInfo.stock,
        price: newStockInfo.price,
        likes: newStockInfo.likes.length
      };
    }
    let updatedStockPrice = { price };
    console.log("Onestock function updatedStockPrice: " +JSON.stringify(updatedStockPrice));
    if ((likesParam && likesParam==='true') && !stockAlreadyInDB.likes.includes(ipAddr)) {
      updatedStockPrice.$push = { likes: ipAddr }; //$push used to append array
    }
    let updatedStock = await Project.findOneAndUpdate(
      { stock }, updatedStockPrice, { new: true });
    
    return {
      stock: updatedStock.stock,
      price: updatedStock.price,
      likes: updatedStock.likes.length      
    }
  } catch(error){
    return 'There was an error in the process, please try again later.';
  }
}

//function to look up price of 2 stocks (stock is now an array of 2 stocks)
let twoStocks = async (stock, ipAddr, likesParam) => {
  console.log(stock, ipAddr, likesParam);
  console.log(stock[0], stock[1]);
  try {
    let firstStk = await oneStock(stock[0].toUpperCase(), ipAddr, likesParam);
    let secondStk = await oneStock(stock[1].toUpperCase(), ipAddr, likesParam);
    
    return [{
      stock: firstStk.stock,
      price: firstStk.price,
      rel_likes: firstStk.likes - secondStk.likes
      },
      {
      stock: secondStk.stock,
      price: secondStk.price,
      rel_likes: secondStk.likes - firstStk.likes
    }];
  } 
  catch(error){
    return 'Process error: ' +error;
  }
}

module.exports = function (app, db) {

  app.route('/api/stock-prices')
    .get(async function(req, res){
      try {
        //Check data format
        if (Object.keys.length === 0 || !Object.keys(req.query).includes('stock')){
          return res.status(400).send('Please provide valid parameters.');
        }
        
        //Extract req.params
        let { stock, like } = req.query;
        console.log("Extracted req params: " +req.query.stock +", " +req.query.like);
        let ipAddr = (req.header('x-forwarded-for') || req.connection.remoteAddress).split(',')[0];
        console.log("request coming from ip address: " +ipAddr);
          
        //create stock data
        let stockData = (typeof(stock) === "string")? 
            await oneStock(stock.toUpperCase(), ipAddr, like)
          : await twoStocks(stock, ipAddr, like);
        
        return res.json({ stockData });
      } catch(error){
        res.send({ stockData: 'Process error. Start again.' });
      }
    }); //end of module exports
};