const Table = require('../model/table');

exports.getAlltables = async (restaurantName) => {
    try {
        const tables = await Table.find({ restaurantName });
        return tables;
    } catch (error) {
        console.error('Error fetching tables:', error.message);
        throw new Error('Internal server error');
    }
};


exports.createTable = async ({
  customerName,
  customerPhone,
  reservationDate,
  reservationTime,
  tableid
}, restaurantName) => {
  try {
    if (!customerName || !customerPhone || !reservationDate || !reservationTime || !tableid) {
      throw new Error('All fields (name, phone, date, time, table ID) are required');
    }

    const tableAlreadyBooked = await Table.findOne({
      reservationDate,
      reservationTime,
      tableid,
      restaurantName
    });

    if (tableAlreadyBooked) {
      throw new Error('Table is already booked for the selected date and time');
    }

    const newBooking = new Table({
      customerName,
      customerPhone,
      reservationDate,
      reservationTime,
      tableid,
      restaurantName // ✅ Add scoping
    });

    await newBooking.save();
    return newBooking;
  } catch (error) {
    console.error('Error in booking:', error.message);
    throw new Error('Internal server error');
  }
};
