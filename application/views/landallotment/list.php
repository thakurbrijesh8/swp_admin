<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Allotment of land in Industrial Area</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Allotment of Plot</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="landallotment_datatable_container">
    </div>
    <div class="container-fluid" id="landallotment_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="landallotment_form1_pdf_form" action="landallotment/generate_form1" method="post">
    <input type="hidden" id="landallotment_id_for_landallotment_form1" name="landallotment_id_for_landallotment_form1">
</form>
<form target="_blank" id="landallotment_certificate_pdf_form" action="landallotment/generate_certificate" method="post">
    <input type="hidden" id="landallotment_id_for_certificate" name="landallotment_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_landallotment" action="landallotment/generate_excel" method="post">
</form>