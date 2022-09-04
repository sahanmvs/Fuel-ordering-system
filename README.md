# Fuel-ordering-system
Fuel ordering system for Gas stations. A Gas station can place an order by entering NIC and the fuel amount in litres. Once the order is success, a unique key is given to check the order status and to confirm whether they receive the order. When order-service creates a new order, allocation-service checks the stock for fuel availability. If allocation is success then the schedule-service generate a date to deliver the order. Dispatch-service dispatches the orders. Two UIs. FOS UI is for ordering the fuel, FDS UI is for dispatching the orders. 

- Create orders
- Check order status
- Confirm order receiving
- Check all order status 
- Dispatch orders
  

### Used Technologies

- NodeJs
- Spring Boot
- Kafka
- Angular
  
  
