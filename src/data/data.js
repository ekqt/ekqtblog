/***** LIST ALL POST BEING UPLOADED *****/
/***** Remove all dashes and change to camelCase */
import helloWorld from "./hello-world.md";
import understandingMorgan from "./understanding-morgan.md";
import understandingJest from "./understanding-jest.md";
import understandingRestClientForVsCode from "./understanding-rest-client-for-vs-code.md";
import howToUseADevelopmentServer from "./how-to-use-a-development-server.md";
import outboundRestIntegrations from "./outbound-rest-integrations.md";
import understandingPasswordless from "./understanding-passwordless.md";
import inboundRestIntegrations from "./inbound-rest-integrations.md";
import scriptedRestApis from "./scripted-rest-apis.md";
import understandingColorSchemes from "./understanding-color-schemes.md";
import whatIsDesign from "./what-is-design.md";
import howIDeployMyProjectsIn2022 from "./how-i-deploy-my-projects-in-2022.md";

const posts = [];

/***** PUSH ALL POST BEING UPLOADED *****/
posts.unshift({
  date: "Mar 28, 2022",
  data: helloWorld,
  tag: "General"
});
posts.unshift({
  date: "Jun 5, 2021",
  data: understandingMorgan,
  tag: "Software"
});
posts.unshift({
  date: "Jun 20, 2021",
  data: understandingJest,
  tag: "Software"
});
posts.unshift({
  date: "Jun 26, 2021",
  data: understandingRestClientForVsCode,
  tag: "Software"
});
posts.unshift({
  date: "Dec 11, 2021",
  data: howToUseADevelopmentServer,
  tag: "Software"
});
posts.unshift({
  date: "Mar 31, 2022",
  data: outboundRestIntegrations,
  tag: "ServiceNow"
});
posts.unshift({
  date: "Apr 2, 2022",
  data: understandingPasswordless,
  tag: "Software"
});
posts.unshift({
  date: "Apr 5, 2022",
  data: inboundRestIntegrations,
  tag: "ServiceNow"
});
posts.unshift({
  date: "Apr 6, 2022",
  data: scriptedRestApis,
  tag: "ServiceNow"
});
posts.unshift({
  date: "Apr 9, 2022",
  data: understandingColorSchemes,
  tag: "Design"
});
posts.unshift({
  date: "Apr 9, 2022",
  data: whatIsDesign,
  tag: "Design"
});
posts.unshift({
  date: "Apr 10, 2022",
  data: howIDeployMyProjectsIn2022,
  tag: "Software"
});

export default posts;
