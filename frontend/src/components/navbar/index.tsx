import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "../ui/button";

export default function Navbar() {
    const { logout, user } = useAuthStore();
    return (
        <div>
            Navbar
            <div>
                {
                    user && (
                        <>
                            <p>Profiel</p>

                            <Button onClick={logout} variant={"secondary"}>Logout</Button>
                        </>
                    )
                }
            </div>
        </div>
    )
}