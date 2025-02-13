<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark"><i class="nav-icon fas fa-briefcase"></i> List of Employee(s)</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item">Admin Master Management</li>
                    <li class="breadcrumb-item active">Employee(s)</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title float-right">
                    <button type="button" class="btn btn-sm btn-primary"
                            id="new_employee_btn_for_employee"
                            onclick="Employee.listview.askForNewEmployee(false, {});">Add New Employee</button>
                </h3>
            </div>
            <div class="card-body" id="employee_datatable_container">
            </div>
        </div>
    </div>
</section>