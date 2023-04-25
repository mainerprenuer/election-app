import mongoose from "mongoose";

const connectMongo = async () => {
  console.log("Connecting to mongo");

  if (mongoose.connections[0].readyState) {
    console.log(`connected already`);
  } else {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, () => {
      console.log("CONNECTED to mongo");
    });
  }
};

export default connectMongo;

// const port = process.env.PORT || 3007;
// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(
//       port,
//       console.log(`Success - Server is runnuing on port: ${port}`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();
