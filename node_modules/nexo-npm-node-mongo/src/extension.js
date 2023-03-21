const { ObjectId, Db} = require('mongodb');

function extend(db)
{
    db.collection = extendCollection(db);
    db.col = db.collection;
    db.id = extendId;

    return db;
}

function extendId(id)
{
    try { return new ObjectId(id); }
    catch (err) { return new ObjectId(0) }
}

function extendCollection(db)
{
    db.__collection = db.collection;

    return function(name, options) {
        let col = db.__collection(name, options);
        col.doc = (id, options) => col.findOne({"_id": this.id(id)}, options);
        col.set = (id, data, options) => col.updateOne({ ...data, "_id": this.id(id) }, options);
        col.del = (id, options) => col.deleteOne({"_id": this.id(id)}, options);
        col.all = (options) => col.find({}, options);
        return col;
    };
}

module.exports = extend;
