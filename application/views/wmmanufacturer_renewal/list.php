<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Renewal under "License for Manufacturer"</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Manufacturer</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="manufacturer_renewal_form_and_datatable_container">
    </div>
</section>
<form target="_blank" id="manufacturer_renewal_form1_pdf_form" action="manufacturer_renewal/generate_form1" method="post">
    <input type="hidden" id="manufacturer_renewal_id_for_manufacturer_renewal_form1" name="manufacturer_renewal_id_for_manufacturer_renewal_form1">
</form>
<form target="_blank" id="manufacturer_renewal_certificate_pdf_form" action="manufacturer_renewal/generate_certificate" method="post">
    <input type="hidden" id="manufacturer_renewal_id_for_certificate" name="manufacturer_renewal_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_manufacturer_renewal" action="manufacturer_renewal/generate_excel" method="post">
</form>