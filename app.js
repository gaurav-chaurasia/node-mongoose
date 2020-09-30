const mongoose = require('mongoose');

const Dishes = require('./model/dishes');

const url = 'mongodb://localhost:27017/complete-backend';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connect.then((db) => {
    console.log('Connected correctly to mongodb!');

    var newDish = Dishes({
        name: 'chaat',
        description: 'test'
    });

    newDish.save()
        .then((dish) => {
            //returns added dish
            console.log(dish);
            
            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log(dishes);

            // return mongoose.connection.close();
            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});
