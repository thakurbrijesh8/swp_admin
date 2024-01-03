<div class="card-header">
    <h3 class="card-title f-w-b" style="float: none; text-align: center;">
        View Tree Cutting Permission Details
    </h3>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 13px;">
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 40%;">Application Number</td>
                <td>{{application_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b">District</td>
                <td>{{district_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Village / DMC Ward / SMC Ward</td>
                <td>{{village_dmc_ward_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Entity / Establishment Type</td>
                <td>{{entity_establishment_type_text}}</td>
            </tr>
        </table>
    </div>
    <div class="card">
        <div class="card-header bg-nic-blue p-2">
            <h3 class="card-title f-w-b f-s-16px">Basic Details</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus text-white"></i>
                </button>
            </div>
        </div>
        <div class="card-body border-nic-blue">
            <div class="table-responsive">
                <table class="table table-bordered table-padding bg-beige mb-0">
                    <tr>
                        <td class="f-w-b" style="width: 40%;">Applicant Name</td>
                        <td>{{applicant_name}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Applicant Address</td>
                        <td>{{applicant_address}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Applicant Mobile Number</td>
                        <td>{{applicant_mobile_number}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Owner Name</td>
                        <td>{{owner_name}}</td>
                    </tr>
                    <tr>
                        <td class="f-w-b">Owner Address</td>
                        <td>{{owner_address}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="m_doc_container_for_{{module_type}}_view"></div>
    <div id="m_other_doc_container_for_{{module_type}}_view"></div>
</div>
<div class="card-footer text-right">
    <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">
        <i class="fas fa-times"></i> &nbsp; Close
    </button>
</div>
