import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from '../../../common/services/toastr.service';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {}
