import { Link } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import './PageLayout.css';

const LEADERSHIP = [
  { name: 'Eze Chinenye', role: 'Chairman, Board of Trustees' },
  { name: 'Vincent Okafor', role: 'Trustee' },
  { name: 'Evelyn Ebahi', role: 'Secretary & Administrator' },
  { name: 'Nwanne Adaugo Linda', role: 'Welfare Coordinator' },
  { name: 'Ebere Rose', role: 'Welfare Coordinator' },
];

function AboutPage() {
  return (
    <div className="teg-page teg-page-about">
      <section className="teg-page-hero">
        <h1>About TEG</h1>
        <p>The 7000 Esther Generation (TEG) Women's Ministry</p>
      </section>
      <section className="teg-page-content">
        <div className="teg-content-inner">
          <div className="teg-content-block">
            <h2>Our Mission</h2>
            <p>
              To raise God's female Generals — women of faith, courage, and purpose who stand in the gap for their families, communities, and nations through prayer, support, and sisterhood.
            </p>
          </div>
          <div className="teg-content-block">
            <h2>Our Vision</h2>
            <p>
              A global community of 7000 Esther-like women who are equipped, empowered, and mobilized to fulfill their God-given destinies and impact their generations.
            </p>
          </div>
          <div className="teg-content-block">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Consistency</strong> — Steadfast in prayer, support, and sisterhood</li>
              <li><strong>Resilience</strong> — Standing strong through trials and trusting God</li>
              <li><strong>Discipline</strong> — Committed to spiritual growth and service</li>
            </ul>
          </div>
          <div className="teg-content-block">
            <h2>Registered Address</h2>
            <p className="teg-address">
              <IoLocationOutline /> 1315A, Hakeem Agboola Crescent, Unity Estate, Lagos State, Nigeria
            </p>
          </div>
          <div className="teg-content-block">
            <h2>Aims & Objectives</h2>
            <p>As a registered non-profit, non-political organisation under the Corporate Affairs Commission of Nigeria, our aims and objectives are:</p>
            <ul>
              <li>To organize outreaches aimed at providing financial and emotional support for women and children, especially widows and single moms.</li>
              <li>To organize prayer, worship and Bible study meetings.</li>
              <li>To organize discipleship trainings for women on motherhood, mental health, emotional intelligence, spiritual growth and personal development.</li>
            </ul>
          </div>
          <div className="teg-content-block">
            <h2>Governance</h2>
            <p>
              TEG is governed by a Board of Trustees elected at General Meetings. The Executive Board is headed by a Chairman and includes a Secretary who handles administrative duties. All decisions are made in accordance with our constitution and the Companies and Allied Matters Act.
            </p>
          </div>
          <div className="teg-content-block">
            <h2>Sources of Income</h2>
            <p>
              We raise funds to aid women in need from our charity shop and contributions from donors and members of the TEG community.
            </p>
          </div>
          <div className="teg-content-block">
            <h2>Financial Accountability</h2>
            <p>
              The Foundation operates bank accounts in its name. All monies received are paid into the account immediately. Independent qualified auditors are appointed annually to audit our financial records, and audited statements are filed with the Corporate Affairs Commission.
            </p>
          </div>
          <div className="teg-content-block">
            <h2>Leadership Team</h2>
            <div className="teg-leadership-grid-page">
              {LEADERSHIP.map((leader) => (
                <div key={leader.name} className="teg-leader-card-page">
                  <div className="teg-leader-avatar-page">
                    <span>{leader.name.charAt(0)}</span>
                  </div>
                  <h4>{leader.name}</h4>
                  <p>{leader.role}</p>
                </div>
              ))}
            </div>
          </div>
          <Link to="/contact" className="teg-btn teg-btn-primary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
