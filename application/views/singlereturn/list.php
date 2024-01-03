<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Single Annual Return</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Single Annual Return</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="single_return_form_and_datatable_container">
    </div>
</section>
<form target="_blank" id="singlereturn_form1_pdf_form" action="singlereturn/generate_form1" method="post">
    <input type="hidden" id="singlereturn_id_for_singlereturn_form1" name="singlereturn_id_for_singlereturn_form1">
</form>
<form target="_blank" id="singlereturn_certificate_pdf_form" action="singlereturn/generate_certificate" method="post">
    <input type="hidden" id="singlereturn_id_for_certificate" name="singlereturn_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_singlereturn" action="singlereturn/generate_excel" method="post">
</form>