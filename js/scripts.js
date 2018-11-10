//Buisness Logic
function Order (pizzaSize, toppings) {
  this.pizzaSize = pizzaSize
  this.toppings = (toppings.length) * 2;
  this.price = 0
}

Order.prototype.finalCost = function (){
  if(this.pizzaSize == "Small"){
    this.price += 5;
  } else if (this.pizzaSize == "Medium"){
    this.price += 10;
  } else if (this.pizzaSize == "Large") {
    this.price += 15;
  } else if (this.pizzaSize == "Supreme") {
    this.price += 20;
    alert("Ready To be Deliver!")
  }

  this.price += this.toppings;
  return this.price;
}

//User Interface Customer---

$(document).ready(function(){
  $("#buttons").click (function(event){
    event.preventDefault();
    $("#show-customer").show();

    var name = $("input#new-name").val();
    $("#name").text(name);

    var phonenumber = $("input#new-phone-number").val();
    $("#phone-number").text(phonenumber);

    var address = $("input#new-address").val();
    $("#address").text(address);

    var drinks = $("input:radio[name=drinks]:checked").val();
    $("#pizza-drinks").text(drinks);

    var sauce = $("input:radio[name=Sauce]:checked").val();
    $("#pizza-sauce").text(sauce);

    var pizzaSize = $("input:radio[name=size]:checked").val();
    $("#pizza-size").text(pizzaSize);
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function(){
      if ($(this).is(':checked')) {
        var checked = ($(this).val());
        toppings.push(checked);
        $("#pizza-toppings").text(toppings);


      }
    });

    var newPizza = new Order (pizzaSize, toppings);
    var cost = newPizza.finalCost();

    $("#price").text("Total Cost $" + cost +".00");
  });
});
