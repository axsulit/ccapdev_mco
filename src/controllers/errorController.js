// controller function for handling fallback route (404 page)
const errorController = (req, res) => {
    res.render("error", {
      title: "Page not Found."
    });
  };
  
export default errorController;
  