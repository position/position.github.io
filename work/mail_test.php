<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
  <form method="post" name="frm" id="frm" action="mailsuccess.php" enctype="multipart/form-data" >
  <input type="hidden" name="contact_to" value="positionfov@gmail.com" />
  <table>
    <tr>
      <td>이름</td>
      <td>
          <input type="text" name="from_name" id="from_name" value="" size="35" />
      </td>
    </tr>
    <tr>
      <td>이메일</td>
      <td>
        <input type="text" name="to_mail" id="to_mail" value="" size="35" />
      </td>
    </tr>
    <tr>
      <td>제목</td>
      <td>
        <input type="text" name="subject" id="subject" value="" size="35" />
      </td>
    </tr>
    <tr>
      <td>내용</td>
      <td>
        <textarea name="content" id="content" rows="5"> </textarea>
      </td>
    </tr>
    <tr>
      <td>첨부파일</td>
      <td>
        <input type="FILE" ID="FILEUPLOAD0" NAME="FILEUPLOAD0" />
      </td>
    </tr>
  </table>
  <button type="submit">COMMIT</button>
  </form>
  </body>
</html>
