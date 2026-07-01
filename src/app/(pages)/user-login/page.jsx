import Image from "next/image";
import Link from "next/link";

// Images
import Driver from "../../../../public/image/driver.png";
import Logo from "../../../../public/image/logo2.png";
import Student from "../../../../public/image/student.png";
import User from "../../../../public/image/user.png";

const loginOptions = [
  {
    title: "Teacher",
    href: "/teacher-login",
    image: Driver,
    alt: "Teacher login",
  },
  {
    title: "Student",
    href: "/student-login",
    image: Student,
    alt: "Student login",
  },
  {
    title: "Admin",
    href: "/admin-login",
    image: User,
    alt: "Admin login",
  },
];

const UserLogin = () => {
  return (
    <section className="py-[50px] max-[500px]:py-[30px]">
      <div className="mx-auto w-full max-w-[1140px] px-4">
        <div className="rounded-[20px] bg-white p-[20px] max-[500px]:p-[10px]">
          <div className="rounded-[10px] bg-[#d6e5ff] p-[20px] max-[500px]:p-[15px]">
            <div className="rounded-[5px] bg-white p-[20px]">
              <div className="py-4 text-center">
                <Image
                  src={Logo}
                  alt="PermisGo logo"
                  priority
                  sizes="170px"
                  className="mx-auto h-auto w-[170px]"
                />

                <div className="py-3">
                  <h3 className="text-2xl font-bold text-slate-950">
                    Register as
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {loginOptions.map((item) => (
                  <div key={item.title} className="mt-3">
                    <Link href={item.href} className="block">
                      <div className="rounded-[5px] bg-[#ffdadd] p-[20px] transition duration-500 ease-in-out hover:bg-[#d6e5ff]">
                        <div className="text-center">
                          <div className="pb-4">
                            <Image
                              src={item.image}
                              alt={item.alt}
                              sizes="100px"
                              className="mx-auto h-auto w-[100px]"
                            />
                          </div>

                          <h4 className="text-xl font-semibold text-[#023389]">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
