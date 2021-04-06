import { Component, OnInit } from '@angular/core';
declare var $: any;
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public isOrders: boolean = true;
  public isOrderInfo: boolean = false;
  public orderId: any;
  public orders: any;
  public orderInfo: any;
  constructor(private spinner: NgxSpinnerService,
    public service: ApiService) { }

  ngOnInit(): void {
    let vm = this;
    vm.spinner.show();
    vm.orders = [];
    vm.service
      .getOrders()
      .subscribe((data: any) => {
        vm.spinner.hide();
        if(data.status == 200)
        {
          vm.orders = data;
        }
        else {
          alert(data.message)
        }
        console.log(vm.orders);
      });
    $('.dropdown-menu').find('form').click(function (e) {
      e.stopPropagation();
    });
  }
  showOrderInfo(orderInfo) {
    let vm = this;
    vm.isOrders = false;
    vm.isOrderInfo = true;
    vm.orderInfo = orderInfo;
    //console.log(vm.orderInfo);
  }
  hideOrderInfo() {
    let vm = this;
    vm.isOrders = true;
    vm.isOrderInfo = false;
  }
}
