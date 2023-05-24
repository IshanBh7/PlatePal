const mongoose = require('mongoose');
const mongoURI = 'mongodb://PlatePal:griezycrmessi@ac-4lq0ein-shard-00-00.mhxei6t.mongodb.net:27017,ac-4lq0ein-shard-00-01.mhxei6t.mongodb.net:27017,ac-4lq0ein-shard-00-02.mhxei6t.mongodb.net:27017/PlatePal?ssl=true&replicaSet=atlas-y7u5tn-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
            })
        }
    });
}

module.exports = mongoDB();