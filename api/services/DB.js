/**
* Return a Waterline model
* @param {String} modelName - the name of the model to return
*/
const findModel = function(modelName) {
    if (modelName === 'user')
        return User;
    else if (modelName === 'check')
        return Check;
    else
        throw new Error('Model ${modelName} not found');
};

module.exports = {
    /**
    * Fetches a objects from the database
    * @param {String} itemsType - the model of the items we want to fetch
    * @param {Object} criteria - the criteria items should match
    * @param {Function} callback
    */
    fetch: function(itemsType, criteria, callback) {
        if (typeof itemsType !== 'string' || typeof criteria !== 'object') throw new Error('Incorret input types');

        findModel(itemsType).find(criteria).exec(function (err, items) {
            return callback(err, items);
        });
    },

    /**
    * Fetches an object from the database
    * @param {String} itemType - the model of the item we want to fetch
    * @param {String} itemId - the id of the item we want to fetch
    * @param {Function} callback
    */
    fetchOne: function(itemType, itemId, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string') throw new Error('Incorrect input types');

        findModel(itemType).findOne({ id: itemId }).exec(function (err, item) {
            return callback(err, item);
        });
    },

    /**
    * Fetches and populate an object from the database
    * @param {String} itemType - the model of the item we want to fetch
    * @param {String} itemId - the id of the item we want to fetch
    * @param {String} associationType - the model of the data set we want to populate our item  with
    * @param {Function} callback
    */
    fetchAndPopulate: function(itemType, itemId, associationType, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string' || typeof associationType !== 'string')
            throw new Error('Incorrect input types');

        findModel(itemType).findOne({ id: itemId }).populate(associationType).exec(function (err, populatedItem) {
            return callback(err, populatedItem);
        });
    },

    /**
    * Creates a database object
    * @param {String} itemType - the model of the item we want to create
    * @param {Object} data - the attributes of the item we want to create
    * @param {Function} callback
    */
    create: function(itemType, data, callback) {
        if (typeof itemType !== 'string' || typeof data !== 'object') return callback('Incorrect input types');

        findModel(itemType).create(data).exec(function (err, created) {
            return callback(err, created);
        });
    },

    /**
    * Updates a database object
    * @param {String} itemType - the model of the item we want to fetch
    * @param {String} itemId - the id of the item we want to fetch
    * @param {Object} data - the attributes to update and their new contents
    * @param {Function} callback
    */
    update: function(itemType, itemId, newData, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string' || typeof newData !== 'object') return callback('Incorrect input types');

        findModel(itemType).update({ id: itemId }, newData).exec(function (err, updated) {
            return callback(err, updated);
        });
    },

    /** Destroys a database object
    * @param {String} itemType - the model of the item we want to fetch
    * @param {String} itemId - the id of the item we want to fetch
    * @param {Function} callback
    */
    destroy: function(itemType, itemId, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string') return callback('Incorrect input types');

        const targetModel = findModel(itemType);

        targetModel.destroy(itemId).exec(function (err, destroyed) {
            return callback(err, destroyed);
        });
    },
};