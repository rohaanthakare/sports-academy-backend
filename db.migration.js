// Clean whole DB
db.getCollection('features').remove({});
db.getCollection('masterdatas').remove({});
db.getCollection('roles').remove({});
db.getCollection('users').remove({});

// Insert superadmin user manually
db.roles.insert({
    "_id" : ObjectId("5f8d1d3bf293f81ebc526b5e"),
    "permissions" : [],
    "code" : "SUPERADMIN",
    "name" : "Superadmin",
    "description" : "Superadmin for Tracker",
    "created_at" : ISODate("2020-10-19T04:59:39.361Z"),
    "updated_at" : ISODate("2020-10-19T05:43:26.645Z"),
    "__v" : 0
});

db.users.insert({
    "roles" : [
        ObjectId("5f8d1d3bf293f81ebc526b5e")
    ],
    "active_role" : ObjectId("5f8d1d3bf293f81ebc526b5e"),
    "username" : "superadmin",
    "password" : "$2a$10$xmVb9AYbFnzc/3AlaGpcUeU9X9FhsIQpyyU8iByzlkDC/fxTAM0g2",
    "mobileNo" : 9999999999.0,
    "email" : "superadmin@tracker.com",
    "created_at" : ISODate("2020-09-29T13:58:16.251Z"),
    "updated_at" : ISODate("2020-09-29T13:58:16.251Z"),
    "__v" : 0
});