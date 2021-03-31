import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public isOrders: boolean = true;
  public isOrderInfo: boolean = false;
  public orderId:any;
  constructor() { }

  ngOnInit(): void {

    $('.dropdown-menu').find('form').click(function (e) {
      e.stopPropagation();
    });

 
    
  }
  showOrderInfo(orderId)
  {
    let vm = this;
    vm.isOrders = false;
    vm.isOrderInfo = true;
    vm.orderId = orderId;
  }


}
