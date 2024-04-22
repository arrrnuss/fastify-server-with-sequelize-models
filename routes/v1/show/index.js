"use strict";
const fastify = require('fastify')(); // Import Fastify

module.exports = async function (fastify, opts) {

  fastify.get("/user-list",  async (request, reply) => {
    try {

          const { users, companys} = fastify.models;
  
        console.log('Associated Users:');
  
        const userList = await users.findAll({
          include: [
            { model: companys, attributes: ['company'], as: 'companys_users' },
          ],
          raw: true // Return raw JSON data
        });
  
        console.log(userList);
  
        // Modify the userList to extract company name, and handle null values for department and position
        const modifiedUserList = userList.map(user => {
          return {
            ...user,
            company: user['companys_users.company'], // Extracting company name
          };
        });
  
        console.log('Users with associated data:', modifiedUserList);
  
        return modifiedUserList;
  
    
    } catch (error) {
      console.log("error", error);
      return { error: "error" };
    }
  });





  fastify.post("/add-user", async (request, reply) => {
    const { body } = request;
    console.log("sfdsfsdf", body)
    const { users } = fastify.models;

    try {
      const user = await users.create(body);
      console.log("user add : ",user);

      return { message: "User added successfully!" };
    } catch (error) {
      console.error('Error adding user:', error);

      // Check if the error is a SequelizeUniqueConstraintError
      if (error.name === 'SequelizeUniqueConstraintError') {
        // Check specific fields causing the unique constraint violation
        if (error.fields.username) {
          return { error: 'Username already exists' };
        } else if (error.fields.phoneNumber) {
          return { error: 'Phone Number already exists' };
        } else if (error.fields.email) {
          return { error: 'Email already exists' };
        }
      }
      return { error: 'Internal server error' };
    }
  });


  fastify.post("/edit-user", async (request, reply) => {
    const { users,squadmembers } = fastify.models;
    console.log("edit user information received:", request.body);
    const { body } = request;
    const KeyID = body.KeyID; // Assuming KeyID is a unique identifier for the user

    try {

      const checkuser = await users.findOne({
        where: {
          KeyID: KeyID
        },
      });
      console.log("aaaaa", checkuser)

      if (checkuser.length === 0) {
        return { error: "User not found with the given KeyID" };
      }

      const checkduplicate = await users.findOne({
        where: {
          KeyID: {
            [Sequelize.Op.not]: KeyID
          },
          [Sequelize.Op.or]: [
            { username: body.username },
            { phoneNumber: body.phoneNumber },
            { email: body.email },
          ],
        },
      });

      if (checkduplicate) {
        if (checkduplicate.username === body.username) {


          return { error: "Username already exists" };
        } else if (checkduplicate.phoneNumber === body.phoneNumber) {
          return { error: "Phone number already exists" };
        } else if (checkduplicate.email === body.email) {
          return { error: "Email already exists" };
        }
      } else {

        const checkoldrole = await users.findOne({
          where:{
            KeyID:body.KeyID
          }
        }) 
        // If no duplicates found, update the record
        const [numUpdatedRows] = await users.update(body, {
          where: {
            KeyID: body.KeyID,
          },
        });

        // Check if any records were updated
        if (numUpdatedRows === 0) {
          return { error: "User not found with the given KeyID" };
        }

        if(checkoldrole.role !== body.role){
          console.log("role changed");
          if(checkoldrole.role === 'HR'){
            console.log("ROO");
            const changeroleinsquad = await squadmembers.update(
              { role: 'staff' }, 
              { where: { userID: body.KeyID } }
            );
          }else if(checkoldrole.role === 'user'){
            console.log("LOO");

            const changeroleinsquad = await squadmembers.update(
              { role: 'HR' }, 
              { where: { userID: body.KeyID } }
            );
          }
        }

        return { message: "User updated successfully" };
      }

    } catch (error) {
      console.error("Error updating user:", error);
      return { error: error };
    }
  });



}