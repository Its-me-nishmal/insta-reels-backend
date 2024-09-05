const app = require('./app');

const PORT = process.env.PORT || 5000;

app.get('/',(o,r)=>r.json({"working":true}))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
