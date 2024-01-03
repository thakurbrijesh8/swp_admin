<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Buyer of Plot For Lease</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Registration</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="transfer_datatable_container">
    </div>
    <div class="container-fluid" id="transfer_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="transfer_form1_pdf_form" action="transfer/generate_form1" method="post">
    <input type="hidden" id="transfer_id_for_transfer_form1" name="transfer_id_for_transfer_form1">
</form>
<form target="_blank" id="transfer_certificate_pdf_form" action="transfer/generate_certificate" method="post">
    <input type="hidden" id="transfer_id_for_certificate" name="transfer_id_for_certificate">
</form>