"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// รายชื่อจังหวัดของประเทศไทย 77 จังหวัด
const provinces = [
  "กรุงเทพมหานคร","กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น","จันทบุรี","ฉะเชิงเทรา","ชลบุรี","ชัยนาท","ชัยภูมิ","ชุมพร","เชียงราย","เชียงใหม่",
  "ตรัง","ตราด","ตาก","นครนายก","นครปฐม","นครพนม","นครราชสีมา","นครศรีธรรมราช","นครสวรรค์","นนทบุรี","นราธิวาส","น่าน","บึงกาฬ","บุรีรัมย์","ปทุมธานี","ประจวบคีรีขันธ์","ปราจีนบุรี","ปัตตานี","พระนครศรีอยุธยา","พังงา","พัทลุง","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","พะเยา","ภูเก็ต","มหาสารคาม","มุกดาหาร","แม่ฮ่องสอน","ยโสธร","ยะลา","ร้อยเอ็ด","ระนอง","ระยอง","ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ","สกลนคร","สงขลา","สตูล","สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร","สระแก้ว","สระบุรี","สิงห์บุรี","สุโขทัย","สุพรรณบุรี","สุราษฎร์ธานี","สุรินทร์","หนองคาย","หนองบัวลำภู","อ่างทอง","อำนาจเจริญ","อุดรธานี","อุตรดิตถ์","อุทัยธานี","อุบลราชธานี"
];

export default function SignupPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Birthdate, setBirthdate] = useState<Dayjs | null>(null);
  const [Address, setAddress] = useState("");
  const [Province, setProvince] = useState("");
  const [Gender, setGender] = useState("");

  // state สำหรับ validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ตรวจสอบ Email
  useEffect(() => {
    if (Email.length > 0 && !Email.includes("@")) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }, [Email]);

  // ตรวจสอบ Password
  useEffect(() => {
    const hasLetter = /[a-zA-Z]/.test(Password);
    const hasNumber = /\d/.test(Password);
    if (Password.length > 0 && Password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (Password.length > 0 && (!hasLetter || !hasNumber)) {
      setPasswordError("Password must contain both letters and numbers");
    } else {
      setPasswordError("");
    }
  }, [Password]);

  const handleRegister = () => {
    if (
      !Email ||
      !Password ||
      !Firstname ||
      !Lastname ||
      !Birthdate ||
      !Address ||
      !Province ||
      !Gender ||
      emailError ||
      passwordError
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
    }

    console.log({
      Email,
      Password,
      Firstname,
      Lastname,
      Birthdate: Birthdate?.format("DD/MM/YYYY"),
      Address,
      Province,
      Gender,
    });

    alert("สมัครสมาชิกสำเร็จ! ดูข้อมูลได้ที่ console");
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", my: 4 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          สมัครสมาชิก
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={emailError}
          error={!!emailError}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={passwordError}
          error={!!passwordError}
        />

        <TextField
          label="ชื่อ"
          variant="outlined"
          fullWidth
          margin="normal"
          value={Firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <TextField
          label="นามสกุล"
          variant="outlined"
          fullWidth
          margin="normal"
          value={Lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        {/* วันเกิดแบบ Calendar */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="วันเกิด"
                value={Birthdate}
                format="DD/MM/YYYY"   // 👉 บังคับให้เป็น dd/MM/yyyy
                onChange={(newValue) => setBirthdate(newValue)}
                slotProps={{
                textField: {
                fullWidth: true,
                margin: "normal",
                },
                }}
            />
        </LocalizationProvider>


        <TextField
          label="ที่อยู่"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* จังหวัด dropdown แบบ TextField select */}
        <TextField
          select
          label="จังหวัด"
          fullWidth
          margin="normal"
          value={Province}
          onChange={(e) => setProvince(e.target.value)}
        >
          {provinces.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>

        {/* เพศ dropdown แบบ TextField select */}
        <TextField
          select
          label="เพศ"
          fullWidth
          margin="normal"
          value={Gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="ชาย">ชาย</MenuItem>
          <MenuItem value="หญิง">หญิง</MenuItem>
          <MenuItem value="ไม่ระบุ">ไม่ระบุ</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          ลงทะเบียน
        </Button>
      </CardContent>
    </Card>
  );
}
