export const deleteAgent = async (db, req, res) => {
  const { id: id } = req.query;
  try {
    const data = await db.collection("agents").find({ _id: id });

    res.status(200).json({ data: data, length: data.length });
  } catch (e) {
    console.log(e);
    console.log("Oops an error occured");
  }
};
