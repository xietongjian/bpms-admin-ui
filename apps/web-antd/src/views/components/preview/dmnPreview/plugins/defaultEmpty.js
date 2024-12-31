export default (key, name, type) => {
  if (!type) type = "flowable";
  const TYPE_TARGET = {
    activiti: "http://activiti.org/bpmn",
    camunda: "http://bpmn.io/schema/bpmn",
    flowable: "http://flowable.org/bpmn"
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="dish" name="Dish" namespace="http://camunda.org/schema/1.0/dmn" exporter="dmn-js (https://demo.bpmn.io/dmn)" exporterVersion="11.0.2">
  <decision id="${key}" name="${name}" >
    <decisionTable id="DecisionTable_${key}">
      <input id="InputClause_1hmm6z2">
        <inputExpression id="LiteralExpression_0eaabht" typeRef="string" />
      </input>
      <output id="OutputClause_1ua72fu" typeRef="string" />
    </decisionTable>
  </decision>
</definitions>`;
};
