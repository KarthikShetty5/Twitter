import { Redirect } from "expo-router"
//this is added bcoz of oner error ,page missing error
export default function Index() {
    return (
        <Redirect href={"/signin"} />
    )
}