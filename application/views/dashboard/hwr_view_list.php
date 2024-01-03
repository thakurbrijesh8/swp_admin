<div class="card-header">
    <h3 class="card-title f-w-b" style="float: none; text-align: center;">
        View Detailed Head Wise Report
    </h3>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 13px;">
    <div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead>
                <tr class="bg-light-gray">
                    <th class="text-center" style="min-width: 120px;">Department Name</th>
                    <th class="text-center" style="min-width: 150px;">Service Name</th>
                    <th class="text-center" style="min-width: 70px;">District</th>
                    <th class="text-center" style="min-width: 120px;">Total Payment Under This Head</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center">{{department_name}}</td>
                    <td>{{title}}</td>
                    <td class="text-center">{{district_text}}</td>
                    <td class="text-right"><span class="orp_for_hwr_view">0</span>/-</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="table-responsive">
        <table id="dhwr_datatable" class="table table-bordered table-hover">
            <thead>
                <tr class="bg-light-gray">
                    <th class="text-center" style="width: 50px;">No.</th>
                    <th class="text-center" style="min-width: 120px;">Transaction<br>Date & Time</th>
                    <th class="text-center" style="min-width: 105px;">Application Number</th>
                    <th class="text-center" style="min-width: 120px;">Total Payment</th>
                    <th class="text-center" style="min-width: 150px;">Payment Description</th>
                    <th class="text-center" style="min-width: 120px;">Payment Under This Head</th>
                </tr>
            </thead>
            <tbody id="item_container_for_dhwr_view"></tbody>
            <tfoot>
                <tr class="bg-light-gray">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <th class="text-right f-w-b">Total :</th>
                    <th class="text-right f-w-b"><span class="orp_for_hwr_view">0</span>/-</th>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
<div class="card-footer text-right p-2">
    <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">
        <i class="fas fa-times"></i> &nbsp; Close
    </button>
</div>
