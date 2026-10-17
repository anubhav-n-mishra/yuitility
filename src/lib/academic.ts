/** Formula scenarios, not certification of a university regulation. */
export const ACADEMIC_FORMULAS = {
 cbse: {name:'9.5 multiplier scenario', formula:'CGPA × 9.5', slope:9.5, offset:0, scale:10},
 vtu: {name:'VTU formula scenario', formula:'(CGPA − 0.75) × 10', slope:10, offset:-7.5, scale:10},
 anna: {name:'Anna formula scenario', formula:'CGPA × 10', slope:10, offset:0, scale:10},
 mumbai: {name:'Mumbai formula scenario', formula:'7.1 × CGPA + 12', slope:7.1, offset:12, scale:10},
 ktu: {name:'KTU formula scenario', formula:'(CGPA − 0.5) × 10', slope:10, offset:-5, scale:10},
 gtu: {name:'GTU formula scenario', formula:'(CGPA − 0.5) × 10', slope:10, offset:-5, scale:10},
 sppu: {name:'SPPU formula scenario', formula:'(CGPA − 0.75) × 10', slope:10, offset:-7.5, scale:10},
 aktu: {name:'AKTU formula scenario', formula:'CGPA × 10', slope:10, offset:0, scale:10},
 linear10: {name:'10-point linear ratio', formula:'CGPA ÷ 10 × 100', slope:10, offset:0, scale:10},
 linear4: {name:'4-point linear ratio', formula:'GPA ÷ 4 × 100', slope:25, offset:0, scale:4},
 custom: {name:'Custom formula', formula:'CGPA × multiplier + offset', slope:9.5, offset:0, scale:10},
};
export type AcademicFormula = keyof typeof ACADEMIC_FORMULAS;
export function academicPercentage(score:number, scale:number, slope:number, offset:number) {
 if (![score,scale,slope,offset].every(Number.isFinite)||scale<=0||score<0||score>scale) throw new RangeError('Enter a score within the selected scale.');
 const result=score*slope+offset;
 if(result<0||result>100) throw new RangeError('This formula gives a result outside 0–100%. Check that the rule applies to your score; the result is not silently clipped.');
 return result;
}
