<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Occupancy Certificate / Part Occupancy Certificate</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#home">Home</a></li>
                    <li class="breadcrumb-item active">Occupancy Certificate</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="occupancycertificate_form_and_datatable_container">
    </div>
</section>
<form target="_blank" id="occupancycertificate_form1_pdf_form" action="occupancy_certificate/generate_form1" method="post">
    <input type="hidden" id="occupancycertificate_id_for_occupancycertificate_form1" name="occupancycertificate_id_for_occupancycertificate_form1">
</form>
<form target="_blank" id="occupancycertificate_certificate_pdf_form" action="occupancy_certificate/generate_certificate" method="post">
    <input type="hidden" id="occupancycertificate_id_for_certificate" name="occupancycertificate_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_occupancycertificate" action="occupancy_certificate/generate_excel" method="post">
</form>