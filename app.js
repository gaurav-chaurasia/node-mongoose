const mongoose = require('mongoose');

const Dishes = require('./model/dishes');

const url = 'mongodb://localhost:27017/complete-backend';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connect.then((db) => {
    console.log('Connected correctly to mongodb!');

    Dishes.create({
        name: 'chaat',
        description: 'test'
    })
        .then((dish) => {
            //returns added dish
            console.log(dish);
            
            return Dishes.findByIdAndUpdate(dish._id, {
                $set: { description: 'Updated descri'}, 
            }, {
                new: true
            }).exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: 'woow dish!!!',
                author: 'GKC'
            });

            // return mongoose.connection.close();
            return dish.save();
        })
        .then((dish) => {
            console.log(dish);
            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});
