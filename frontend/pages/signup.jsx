import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/subHeading";

export function SignUp(){
    return(<div>
        <Heading heading={"SignUp"}></Heading>
        <SubHeading subheading={"Enter your information to create an account"} ></SubHeading>
        <InputBox boxTitle={"First Name"} Placeholder={"John"}></InputBox>
        <InputBox boxTitle={"Last Name"} Placeholder={"Doe"}></InputBox>
        <InputBox boxTitle={"Email"} Placeholder={"johnny@gmail.com"}></InputBox>
        <InputBox boxTitle={"Password"} Placeholder={"123456#2"}></InputBox>
        <Button label={"Sign Up"} ></Button>
        <BottomWarning label={"Already have an account?"} linkText={"Sign In"} to={"/signin"}></BottomWarning>
    </div>)
}