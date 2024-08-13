import { Component , OnInit} from '@angular/core';
import { PaymentDetailService } from '../services/payment-detail.service';
import { PaymentDetail } from '../services/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
 
  constructor(public service : PaymentDetailService ,private toastr:ToastrService)
  {

  }
  ngOnInit() : void{
    this.service.refreshList();
  }
  populateForm(selectedRecord : PaymentDetail)
  {
        this.service.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number){
    if(confirm('Are you sure to delete this record ?'))
     this.service.deletePaymentDetail(id).subscribe({
      next : res => {
        this.service.list = res as PaymentDetail[]
        this.toastr.error("Deleted successfully",'Payment Detail register')
      },error : err =>{console.log(err)}
     })
  }

}
