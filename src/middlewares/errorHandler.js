


export function errorHandler (error, req, res) {

    console.error(error);
      res.status(500).send({
		status: 500,
		message: "Something went wrong",
		data: error || error.message,
		// конкретне повідомлення про помилку, отримане з об'єкта помилки
});
      
  }
