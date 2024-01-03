<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark"><i class="nav-icon fas fa-money-check"></i> Fee Details of Department(s)</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item">Admin Master Management</li>
                    <li class="breadcrumb-item active">Fee Details of Department(s)</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="dept_fd_datatable_container">
    </div>
</section>
<!--<tbody>
    <tr>
        <td class="f-w-b text-center">Daman</td>
        <td>
            <input type="text" id="daman_pao_code_for_dept_fhd" name="daman_pao_code_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="PAO Code !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_pao_code}}">
        </td>
        <td>
            <input type="text" id="daman_ddo_code_for_dept_fhd" name="daman_ddo_code_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="DDO Code !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_ddo_code}}">
        </td>
        <td>
            <input type="text" id="daman_grant_number_for_dept_fhd" name="daman_grant_number_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Grant Number !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_grant_number}}">
        </td>
        <td>
            <input type="text" id="daman_major_head_for_dept_fhd" name="daman_major_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Major Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_major_head}}">
        </td>
        <td>
            <input type="text" id="daman_sub_major_head_for_dept_fhd" name="daman_sub_major_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Sub Major Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_sub_major_head}}">
        </td>
        <td>
            <input type="text" id="daman_minor_head_for_dept_fhd" name="daman_minor_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Minor Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_minor_head}}">
        </td>
        <td>
            <input type="text" id="daman_sub_head_for_dept_fhd" name="daman_sub_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Sub Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_sub_head}}">
        </td>
        <td>
            <input type="text" id="daman_detailed_head_for_dept_fhd" name="daman_detailed_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Detailed Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_detailed_head}}">
        </td>
        <td>
            <input type="text" id="daman_object_for_dept_fhd" name="daman_object_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Object !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_object}}">
        </td>
        <td>
            <input type="text" id="daman_category_for_dept_fhd" name="daman_category_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Category !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{daman_category}}">
        </td>
    </tr>
    <tr>
        <td class="f-w-b text-center">Diu</td>
        <td>
            <input type="text" id="diu_pao_code_for_dept_fhd" name="diu_pao_code_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="PAO Code !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_pao_code}}">
        </td>
        <td>
            <input type="text" id="diu_ddo_code_for_dept_fhd" name="diu_ddo_code_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="DDO Code !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_ddo_code}}">
        </td>
        <td>
            <input type="text" id="diu_grant_number_for_dept_fhd" name="diu_grant_number_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Grant Number !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_grant_number}}">
        </td>
        <td>
            <input type="text" id="diu_major_head_for_dept_fhd" name="diu_major_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Major Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_major_head}}">
        </td>
        <td>
            <input type="text" id="diu_sub_major_head_for_dept_fhd" name="diu_sub_major_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Sub Major Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_sub_major_head}}">
        </td>
        <td>
            <input type="text" id="diu_minor_head_for_dept_fhd" name="diu_minor_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Minor Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_minor_head}}">
        </td>
        <td>
            <input type="text" id="diu_sub_head_for_dept_fhd" name="diu_sub_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Sub Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_sub_head}}">
        </td>
        <td>
            <input type="text" id="diu_detailed_head_for_dept_fhd" name="diu_detailed_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Detailed Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_detailed_head}}">
        </td>
        <td>
            <input type="text" id="diu_object_for_dept_fhd" name="diu_object_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Object !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_object}}">
        </td>
        <td>
            <input type="text" id="diu_category_for_dept_fhd" name="diu_category_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Category !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{diu_category}}">
        </td>
    </tr>
    <tr>
        <td class="f-w-b text-center">DNH</td>
        <td>
            <input type="text" id="dnh_pao_code_for_dept_fhd" name="dnh_pao_code_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="PAO Code !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_pao_code}}">
        </td>
        <td>
            <input type="text" id="dnh_ddo_code_for_dept_fhd" name="dnh_ddo_code_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="DDO Code !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_ddo_code}}">
        </td>
        <td>
            <input type="text" id="dnh_grant_number_for_dept_fhd" name="dnh_grant_number_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Grant Number !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_grant_number}}">
        </td>
        <td>
            <input type="text" id="dnh_major_head_for_dept_fhd" name="dnh_major_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Major Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_major_head}}">
        </td>
        <td>
            <input type="text" id="dnh_sub_major_head_for_dept_fhd" name="dnh_sub_major_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Sub Major Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_sub_major_head}}">
        </td>
        <td>
            <input type="text" id="dnh_minor_head_for_dept_fhd" name="dnh_minor_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Minor Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_minor_head}}">
        </td>
        <td>
            <input type="text" id="dnh_sub_head_for_dept_fhd" name="dnh_sub_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Sub Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_sub_head}}">
        </td>
        <td>
            <input type="text" id="dnh_detailed_head_for_dept_fhd" name="dnh_detailed_head_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Detailed Head !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_detailed_head}}">
        </td>
        <td>
            <input type="text" id="dnh_object_for_dept_fhd" name="dnh_object_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Object !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_object}}">
        </td>
        <td>
            <input type="text" id="dnh_category_for_dept_fhd" name="dnh_category_for_dept_fhd" 
                   class="form-control dept-fhd-numeric text-center" placeholder="Category !"
                   onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));"
                   maxlength="10" value="{{dnh_category}}">
        </td>
    </tr>
</tbody>-->