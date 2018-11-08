//Buisness Logic For New Customers--
function NewCustomer() {
  this.customers = [],
  this.pizzaid = 0
}

NewCustomer.prototype.addCustomer = function(customer) {
  customer.id = this.assignId();
  this.customers.push(customer);
}

NewCustomer.prototype.assignId = function() {
  this.pizzaid += 1;
  return this.pizzaid;
}

NewCustomer.prototype.findCustomer = function(id) {
  for (var i=0; i< this.customers.length; i++) {
    if (this.customers[i]) {
      if (this.customers[i].id == id) {
        return this.customers[i];
      }
    }
  };
  return false;
}

NewCustomer.prototype.deleteCustomer = function(id) {
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
// Buisness Logic For Pizza Price--
NewCustomer.prototype.price = function(){
  var meat = this.meat.length;
  var veggies = this.veggies.length;
  if(this.size == "Small") {
    return 6 + (veggies*2) + (meat*3);
  }else if(this.size == "Medium") {
    return 8 + (veggies*2) + (meat*3);
  }else if(this.size == "Latge") {
    return 10 + (vegies*2) + (meat*3);
  } else {
    return 12 + (vegies*2) + (meat*3);
  }
}

// Buisness Logic For Information--
function information(firstName, lastName, phoneNumber, address, size, meat, veggies, sauce, drinks, price) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.address = address,
  this.size = size,
 this.meat = meat,
  this.veggies = veggies,
 this.sauce = sauce,
  this.drinks = drinks,
  this.price = []
}

information.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------

var customerinfo = new NewCustomer ();

function displayCustomerDetails(customerToDisplay) {
  var customerList = $("ul#customers");
  var htmlForCustomerInfo = "";
  customerToDisplay.customers.forEach(function(customer) {
    htmlForCustomerInfo += "<li id=" + customer.id + ">" +   customer.firstName + " " + customer.lastName + "</li>";
  });
  customerList.html(htmlForCustomerInfo);
};

function showorder(pizzaId) {
var information = customerinfo.findCustomer(pizzaId);
 $("#show-customer").show();
 $(".first-name").html(information  .firstName);
$(".last-name").html(information  .lastName);
$(".phone-number").html(information .phoneNumber);
$(".address").html(information  .address);
 $("#size").html(information.size +" " );
  $("#meat").html(information.meat +" " );
 $("#veggies").html(information.veggies +" " );
 $("#sauce").html(information.sauce+ " ");
 $("#drinks").html(information.drinks+ " ");
  $("#price").html(information.price);
 var deletelist = $("#deletelist");
 deletelist.empty();
 deletelist.append("<button class='deleteButton' id=" +  + information.id + ">Delete</button>");
}

function attachCustomerlist(pizzaId) {
  $("ul#customers").on("click", "li", function() {
    showorder(this.id);
  });
  $("#deltelist").on("click", ".deleteButton", function() {
    customerinfo.deleteCustomer(this.id);
    $("#show-customer").hide();
    displayCustomerDetails(customerinfo);
  });
  $("#checkout").on("click", ".deleteButton", function() {
    customerinfo.deleteCustomer(this.id);
    $("#show-customer").hide();
    displayCustomerDetails(customerinfo);
  });
};

// User Interface for Customer info
$(document).ready(function() {
  attachCustomerlist(NewCustomer.pizzaId);
  $("#buttons").click(function(event) {
    event.preventDefault();
    var size = $("input:radio[name=size]:checked").val();
    var drinks = $("input:radio[name=size1]:checked").val();
    var meat = [];
    $("input:checkbox[name=meat]:checked").each(function(){
     var meat = $(this).val();
     size.push(meat);
   });
   var veggiesprice = [];
   $("input:checkbox[name=veggies]:checked").each(function(){
     var veggiesprice = $(this).val();
     veggiesprice.push(veggiesprice);
   });



    $("#customers").show();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress = $("input#address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#address").val("");
    var newCustomer = new NewCustomer(firstName, lastName, phoneNumber, address, size, meat, veggies, sauce, drinks, price);
    NewCustomer.addCustomer(newCustomer);
    displayCustomerDetails(NewCustomer.pizzaId);
    $("#customers").show();
    alert("Ready for Delivery")
  });
});
