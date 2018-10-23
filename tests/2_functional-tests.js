const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('GET /api/stock-prices => stockData object', () => {
      
      test('1 stock', (done) => { //test 1
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'nke'})
        .end((err, res) => {
          var { stockData } = res.body;
         
          assert.equal(res.status, 200);
          assert.equal(stockData.stock, 'NKE');
          assert.property(stockData, 'price');
          assert.property(stockData, 'likes');
          done();
        });
      });
      
      test('1 stock with like', (done) => { //test 2
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'nke', like: true})
        .end(function(err, res){
          var { stockData } = res.body;
         
          assert.equal(res.status, 200);
          assert.equal(stockData.stock, 'NKE');
          assert.property(stockData, 'price');
          assert.property(stockData, 'likes');
          
          done();
        });
      });
      
      test('1 stock with like again (ensure likes are not double counted)', (done) => { //test 3
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'nke', like: true})
        .end(function(err, res){
          var { stockData } = res.body;
         
          assert.equal(res.status, 200);
          assert.equal(stockData.stock, 'NKE');
          assert.property(stockData, 'price');
          assert.property(stockData, 'likes');
          done();
        });
      });
      
      test('2 stocks', (done) => { //test 4
       chai.request(server)
        .get('/api/stock-prices/?stock=nke&stock=goog')
        .end(function(err, res){
          var { stockData } = res.body;
         
          assert.equal(res.status, 200);
          assert.equal(stockData[0].stock, 'NKE');
          assert.property(stockData[0], 'price');
          assert.property(stockData[0], 'rel_likes');
          assert.equal(stockData[1].stock, 'GOOG');
          assert.property(stockData[1], 'price');
          assert.property(stockData[1], 'rel_likes');
          done();
        });
      });
      
      test('2 stocks with like', (done) => { //test 5
       chai.request(server)
        .get('/api/stock-prices/?stock=nke&stock=goog&like=true')
        .end(function(err, res){
          var { stockData } = res.body;
         
          assert.equal(res.status, 200);
          assert.equal(stockData[0].stock, 'NKE');
          assert.property(stockData[0], 'price');
          assert.property(stockData[0], 'rel_likes');
          assert.equal(stockData[1].stock, 'GOOG');
          assert.property(stockData[1], 'price');
          assert.property(stockData[1], 'rel_likes');
          done();
        }); // end of .end
      }); //end of test 
    }); //end of SUITE .get

}); //end of functional tests suite
