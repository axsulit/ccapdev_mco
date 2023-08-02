import mongoose from 'mongoose';

const url = process.env.MONGODB_URI ?? "";

const database = {

    connectToMongo:  async () => {
        try {
          mongoose.set("strictQuery", false);
          mongoose.connect(url);
          console.log("Connected to Mongo Successfully!");
        } catch (error) {
          console.log(error);
        }
      },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            return callback(result);
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

export default database;