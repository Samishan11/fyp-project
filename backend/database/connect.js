const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/estate', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database Connected')
}).catch(err=>{
    console.log(err)
});
