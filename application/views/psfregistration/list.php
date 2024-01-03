<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Registration of Partnership Firms</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Partnership Firms</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
   <section class="content">
    <div class="container-fluid" id="psfregistration_datatable_container">
    </div>
    <div class="container-fluid" id="psfregistration_form_container" style="display: none;">
    </div>
  </section>

</section>
<form target="_blank" id="psfregistration_form1_pdf_form" action="psfregistration/generate_form1" method="post">
    <input type="hidden" id="psfregistration_id_for_psfregistration_form1" name="psfregistration_id_for_psfregistration_form1">
</form>
<form target="_blank" id="psfregistration_certificate_pdf_form" action="psfregistration/generate_certificate" method="post">
    <input type="hidden" id="psfregistration_id_for_certificate" name="psfregistration_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_psfregistration" action="psfregistration/generate_excel" method="post">
</form>