import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { GoHome } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { LiaBlogSolid } from "react-icons/lia";
import { FaRegCommentDots } from "react-icons/fa";
import { LuCircleDot } from "react-icons/lu";
import { RouteBlog, RouteCategorydetail } from "@/helpers/RouteName";
import useFetch from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getenv";
import Loading from "./Loading";

export function AppSidebar() {

    const { data: categorydata, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: "GET",
        credentials: "include"
    })

    if (!categorydata) return <Loading />;
    return (
        <Sidebar className='pt-5'>
            <SidebarHeader className='bg-white' >
                <h2>Dashboard</h2>
            </SidebarHeader>
            <SidebarContent className='bg-white' >
                <SidebarGroup >
                    <SidebarMenu >
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <GoHome className="mr-2" />
                                <Link to="/"> Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem><SidebarMenuItem>
                            <SidebarMenuButton>
                                <BiCategory className="mr-2" />
                                <Link to={RouteCategorydetail}> Category</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem><SidebarMenuItem>
                            <SidebarMenuButton>
                                <LiaBlogSolid className="mr-2" />
                                <Link to={RouteBlog}> Blogs</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem><SidebarMenuItem>
                            <SidebarMenuButton>
                                <FaRegCommentDots className="mr-2" />
                                <Link to="/"> Comments</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem><SidebarMenuItem>
                            <SidebarMenuButton>
                                <FaRegUser className="mr-2" />
                                <Link to="/"> Users</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup >
                    <SidebarGroupLabel>Category</SidebarGroupLabel>
                    <SidebarMenu >

                        {categorydata && categorydata.category.length > 0 && categorydata.category.map(category => {
                            return (
                                <SidebarMenuItem key={category._id}>
                                    <SidebarMenuButton>
                                        <LuCircleDot className="mr-2" />
                                        <Link to={``}>{category.name}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}

                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}