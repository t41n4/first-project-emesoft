import React from "react";

const img =
  "https://images.pexels.com/photos/3027243/pexels-photo-3027243.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const Content: React.FC = () => (
  <section className="content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
      lobortis dui, vel cursus elit. Maecenas quis facilisis libero, quis porta
      libero. Mauris suscipit, dolor in porttitor sodales, lectus leo tempor
      lorem, nec euismod magna orci in metus. Aliquam erat volutpat. Phasellus
      turpis est, imperdiet eu aliquam ut, congue at elit. Aliquam laoreet lacus
      nec nibh molestie, ut mollis mi consequat. Suspendisse potenti. Duis dolor
      erat, pellentesque ut lorem id.
    </p>
    <img src={img} alt="Man in a fedora" />
  </section>
);

export default Content;
