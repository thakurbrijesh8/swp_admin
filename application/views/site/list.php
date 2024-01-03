<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i>Site Elevation 
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Site Elevation </li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="site_datatable_container">
    </div>
    <div class="container-fluid" id="site_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="site_form1_pdf_form" action="site/generate_form1" method="post">
    <input type="hidden" id="site_id_for_site_form1" name="site_id_for_site_form1">
</form>
<form target="_blank" id="site_certificate_pdf_form" action="site/generate_certificate" method="post">
    <input type="hidden" id="site_id_for_certificate" name="site_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_site" action="site/generate_excel" method="post">
</form>