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
  var result = $("#result");
  result.empty();
  result.append("<button class='deleteButton' id=" +  + customer.id + ">Delete</button>");
}

function attachCustomerlist() {
  $("ul#customers").on("click", "li", function() {
    showCustomer(this.id);
  });
  $("#result").on("click", ".deleteButton", function() {
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
    $("#customers").show();
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
    $("#customers").show();
    alert("Ready for Delivery")
  });
});


// -----------------------------------------Pizza Order--------------
// business logic for cost
function Pizza (size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

var pizzaSize = [];
var pizzaToppings = [];
var price = 0;

Pizza.prototype.sizePrice = function() {
  if (this.size === "Small") {
    price += 5;
  } else if (this.size === "Medium") {
    price += 10;
  } else if (this.size === "Large") {
    price += 15;
  } else {
    price += 20;
  }
  return price;
};
Pizza.prototype.toppingsPrice = function() {
  if (pizzaToppings.length === 0) {
    price += 0;
  } else if (pizzaToppings.length === 1) {
    price += 1.5;
  } else if (pizzaToppings.length === 2) {
    price += 3;
  } else if (pizzaToppings.length === 3) {
    price += 4.5;
  } else {
    price += 6;
  }
  return price;
};

Pizza.prototype.reset = function() {
  price=0;
};

//User Interface for Cost---

$(document).ready(function() {
  $("form#pizza").submit(function(event){
    event.preventDefault();
    $("input:checkbox[name=toppings]:checked").each(function(){
      var InputtedToppings = $(this).val();
      pizzaToppings.push(InputtedToppings);
    });
    var inputtedSize = $('#size option:selected').val();
    var userPizza = new Pizza (inputtedSize, pizzaToppings);
    pizzaSize.push(inputtedSize);
    userPizza.sizePrice();
    userPizza.toppingsPrice();
    $("#price").text("Cost:" + " " +"$" + price);
    alert("Please Insert your Infromation below")

    userPizza.reset();
  });
});
