// Clean whole DB
db.getCollection('features').remove({});
db.getCollection('masterdatas').remove({});
db.getCollection('roles').remove({});
db.getCollection('users').remove({});

// Insert superadmin user manually
db.users.insert({
    "roles" : ['superadmin'],
    "username" : "superadmin",
    "password" : "$2a$10$xmVb9AYbFnzc/3AlaGpcUeU9X9FhsIQpyyU8iByzlkDC/fxTAM0g2",
    "mobileNo" : 9999999999.0,
    "email" : "superadmin@tracker.com",
    "created_at" : ISODate("2020-09-29T13:58:16.251Z"),
    "updated_at" : ISODate("2020-09-29T13:58:16.251Z"),
    "__v" : 0
});