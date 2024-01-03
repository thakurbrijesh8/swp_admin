<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i>  Incentives on Investment Scheme For MSME</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">MSME</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="msme_form_and_datatable_container">
    </div>
</section>
<form target="_blank" id="msme_form1_pdf_form" action="msme/generate_form1" method="post">
    <input type="hidden" id="incentive_id_for_msme_form1" name="incentive_id_for_msme_form1">
</form>
<form target="_blank" id="msme_certificate_pdf_form" action="msme/generate_certificate" method="post">
    <input type="hidden" id="incentive_id_for_certificate" name="incentive_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_msme" action="msme/generate_excel" method="post">
</form>