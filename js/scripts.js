// Business Logic for customerinfo ---------
function info() {
  this.customers = [],
  this.currentId = 0
}

info.prototype.addCustomer = function(customer) {
  customer.id = this.assignId();
  this.customers.push(customer);
}

info.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

info.prototype.findCustomer = function(id) {
  for (var i=0; i< this.customers.length; i++) {
    if (this.customers[i]) {
      if (this.customers[i].id == id) {
        return this.customers[i];
      }
    }
  };
  return false;
}

info.prototype.deleteCustomer = function(id) {
  for (var i=0; i< this.customers.length; i++) {
    if (this.customers[i]) {
      if (this.customers[i].id == id) {
        delete this.customers[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for customers ---------
function information(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
  this.address = address
}

information.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var customerinfo = new info ();

function displayCustomerDetails(customerToDisplay) {
  var customerList = $("ul#customers");
  var htmlForCustomerInfo = "";
  customerToDisplay.customers.forEach(function(customer) {
   htmlForCustomerInfo += "<li id=" + customer.id + ">" +   customer.firstName + " " + customer.lastName + "</li>";
  });
  customerList.html(htmlForCustomerInfo);
};

function showCustomer(customerId) {
  var customer = customerinfo.findCustomer(customerId);
  $("#show-customer").show();
  $(".first-name").html(customer.firstName);
  $(".last-name").html(customer.lastName);
  $(".phone-number").html(customer.phoneNumber);
  $(".address").html(customer.address);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + customer.id + ">Delete</button>");
}

function attachCustomerlist() {
  $("ul#customers").on("click", "li", function() {
    showCustomer(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    customerinfo.deleteCustomer(this.id);
    $("#show-customer").hide();
    displayCustomerDetails(customerinfo);
  });
};

// User Interface for Customer info
$(document).ready(function() {
  attachCustomerlist();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress = $("input#address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#address").val("");
    var newCustomer = new information(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress);
    customerinfo.addCustomer(newCustomer);
    displayCustomerDetails(customerinfo);
  });
});


// -----------------------------------------Pizza Order--------------
// business logic

var inputSize = {"Small":5,"Medium":10, "Large":12, "Supreme":15};
var inputMeat = {"pork":2,"chicken":2, "beef":2};
var inputveggies = {"Pineapple":1,"Olives":1,"Spinach":1,"Onions":1,"Peppers":.50,"Garlic":.50};
var inputDrink = {"sprite":1,"coke":1,"Pepsi":1,"Orange":1,"Water":1,};

function pizza(size, meat, veggies, sauce, drink) {
  this.size = size;
  this.meat = meat;
  this.veggies = veggies;
  this.sauce = sauce;
  this.drink = drink;
}

pizza.prototype.calculatePrice = function (){
  return inputSize[this.size] + inputmeat[this.meat] + inputveggies[this.veggies] + inputsauce[this.meat] + inputdrink[this.drink]
}
  ///user Interface
  $("form#pizza").submit(function(event){
   event.preventDefault()
   alert("We only do Deliveries!")
 var pizzaSize = $("#size").val();
 var pizzaCmeat = $("#meat").val();
 var pizzaveggies= $("#veggies").val();
 var pizzaSauce = $("#sauce").val();
  var pizzadrink = $("#drink").val();
 var newPizza = new pizza(pizzaSize,  pizzaCmeat, pizzaveggies, pizzaSauce, pizzadrink);
 $("#price").text(newPizza.calculatePrice() + "$");
});
