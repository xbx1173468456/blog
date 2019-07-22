<script src='http://mockjs.com/dist/mock.js'></script>
  Mock.mock('http://test.com',{
    "turnoverMaterials|1-5": [{
      "id|+1":122,
      "user_id|+1":202,
      "auth_code|+1":303,
      "validate_status|1-2":2,
      "eable|1-2":1,
      "input_time":'@date("yyyy-mm-dd")',
      "input_person":'@name'
    }]
  })
  // $.ajax({
  //   url:"http://test.com",
  //   type:"get",
  //   dataType:'json',
  // }).done((data,status,xhr)=>{
  //   console.log(JSON.stringify(data,null,4));
  // })