<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Query / Grievance Redressal</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Query / Grievance Redressal</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="query_grievance_datatable_container">
    </div>
    <div class="container-fluid" id="query_grievance_form_container">
    </div>
</section>
<form target="_blank" id="query_grievance_form1_pdf_form" action="query_grievance/generate_form1" method="post">
    <input type="hidden" id="query_grievance_id_for_query_grievance_form1" name="query_grievance_id_for_query_grievance_form1">
</form>
<form target="_blank" id="query_grievance_certificate_pdf_form" action="query_grievance/generate_certificate" method="post">
    <input type="hidden" id="query_grievance_id_for_certificate" name="query_grievance_id_for_certificate">
</form>