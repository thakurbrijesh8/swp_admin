<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Registration of Boilers under The Boilers Act, 1923</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Registration Under Boiler Act</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid" id="boiler_act_form_and_datatable_container">
</div>
<form target="_blank" id="boileract_form1_pdf_form" action="boileract/generate_form1" method="post">
    <input type="hidden" id="boileract_id_for_boileract_form1" name="boileract_id_for_boileract_form1">
</form>
<form target="_blank" id="boiler_certificate_pdf_form" action="boileract/generate_certificate" method="post">
    <input type="hidden" id="boiler_id_for_certificate" name="boiler_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_boiler" action="boileract/generate_excel" method="post">
</form>